import {NextApiRequest,NextApiResponse} from 'next'
import nc from "next-connect";
import prisma from "../../Utils/DBconnector"

const handler = nc<NextApiRequest,NextApiResponse>()

handler.post((req,res)=>{
    
})

export default handler