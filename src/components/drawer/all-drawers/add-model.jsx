import React, { useState } from 'react'
import "../../../styles/drawers/add-model.css"

import { Button } from '@chakra-ui/react'
import { useContext } from 'react'
import MessageContext from '../../../context/message-context'
import Loading from '../../spinner/Loading'

import { getDownloadURL, listAll, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { v4 } from "uuid"
import { modelDb } from '../../../core/firebase/config'

const AddModel = ({ data, setData }) => {

  const [selectedFiles, setSelectedFiles] = useState(null);

  const { setGeneralInfoMessage, generalLoading, setGeneralLoading } = useContext(MessageContext)

  const changeHandler = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setGeneralInfoMessage("Dosya Ekle' ye tıklkayın")
      setSelectedFiles(files);
    }
  };

  const handleSendFile = async () => {
    if (selectedFiles && Object.values(selectedFiles).length > 0) {
      // Başlangıçta yükleme durumu "yükleniyor" olarak ayarlanır
      setGeneralLoading(true);
      setGeneralInfoMessage("Modeli Oluştur' a tıklkayın")
      try {
        await Promise.all(Object.values(selectedFiles).map(async (file) => {
          const modelRef = ref(modelDb, `files/${v4()}/${file.name}`);
          await uploadBytesResumable(modelRef, file);
          const downloadURL = await getDownloadURL(modelRef);
          // Yeni öğeyi mevcut veri dizisine ekleyerek setData işlevini kullan     
          setSelectedFiles(downloadURL);
          // İşlem tamamlandığında yükleme durumu "yükleniyor" olarak ayarlanır
          setGeneralLoading(false);
        }));
      } catch (error) {
        console.error('An error occurred during file upload:', error);
        // Hata durumunu işle
        // Eğer gerekliyse...
        setGeneralLoading(false); // Hata olması durumunda da yükleme durumu "yükleniyor" olarak ayarlanır
      }
    }
  };

  const addNewObject = () => {

    if (!selectedFiles) {
      window.alert("lütfen obje ekleyin!")
      return
    }

    const newObj = {
      id: data && data.length + 1, // Yeni öğenin bir sonraki boş id'si
      name: 'New Object',
      address: 'New Address',
      exits: 0,
      coordinates: [38.25742, 37.75044],
      path: selectedFiles,
      x: 0,
      y: 180,
      z: 90,
      size: 50 // Varsayılan bir boyut değeri
    };

    // Yeni öğeyi mevcut veri dizisine ekleyerek setData işlevini kullan
    setData(prevData => [...prevData, newObj]);
    setSelectedFiles("")
    setGeneralInfoMessage("Model oluşturuldu")

  };



  return (
    <div className='model-upload-content'>
      <div className='model-upload-content-upload'>
        <input type='file' onChange={(e) => changeHandler(e)} />        
      </div>
      <div  className='model-button'>
        <Button onClick={handleSendFile} colorScheme='purple' variant='outline'>Dosyayı Ekle</Button>
        <Button onClick={addNewObject} colorScheme='purple'>
          Modeli Oluştur
        </Button>
      </div>

    </div>
  )
}

export default AddModel