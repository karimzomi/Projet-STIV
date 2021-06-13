import {NextApiRequest,NextApiResponse} from 'next'
import nc from "next-connect";
import prisma from "../../Utils/DBconnector"
import pool from "../../Utils/DBconnectorPG"

const handler = nc<NextApiRequest,NextApiResponse>()

handler.get(async(req,res)=>{
    try{
        // const results = await prisma.trajet.findMany({
        //     include:{
        //         ville_trajet_id_depToville:{
        //             select:{
        //                 nom:true
        //             }
        //         },
        //         ville_trajet_id_arrToville:{
        //             select:{
        //                 nom:true
        //             }
        //         }
        //     }
        // })
        const results = await prisma.trajet.findMany({
            include:{
                tt:{
                    include:{
                        troncon:{
                            select:{
                                ville_troncon_ville_arrToville:{
                                    select:{nom:true}
                                }
                            }                            
                        }
                        
                    }
                }
            }
        })
        console.table(results)        
        res.send(results)
 
        // res.send({TEST:results})
    }catch(e){
        console.error(e);

    }

})

export default handler