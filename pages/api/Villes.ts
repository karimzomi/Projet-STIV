import prisma from '../../Utils/DBconnector'
import nc from 'next-connect'
import { NextApiRequest,NextApiResponse } from "next";

const handler = nc<NextApiRequest,NextApiResponse>()

handler.get(async(req,res)=>{
    const villes = await prisma.ville.findMany()    
    res.send({villes})
})

export default handler