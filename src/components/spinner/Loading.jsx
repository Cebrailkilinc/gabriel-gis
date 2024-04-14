import React from 'react'
import "../../styles/loading.css"
import { Spinner } from '@chakra-ui/react'
const Loading = () => {
    return (
        <div className='loading-content' >
            <div className='loading-content-return'  >
                <Spinner size='xl' />
                <h1>loading...</h1>
            </div>
        </div>
    )
}

export default Loading