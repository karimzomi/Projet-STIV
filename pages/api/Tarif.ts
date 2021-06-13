import {NextApiRequest,NextApiResponse} from 'next'
import nc from "next-connect";
import prisma from "../../Utils/DBconnector"
import pool from "../../Utils/DBconnectorPG"

const handler = nc<NextApiRequest,NextApiResponse>()

handler.get(async(req,res)=>{
    try{
        const result = await prisma.troncon.findMany({
            select:{
                id:true,
                route:{
                    select:{
                        typer:true
                    }
                },
                ville_troncon_ville_depToville:{
                    select:{
                        nom:true
                    }
                },
                ville_troncon_ville_arrToville:{
                    select:{
                        nom:true
                    }
                },
                prix:true
            }
        })
        
        // const villedes_villearr = await prisma.trajet.findMany({
        //     select:{
        //         ville_trajet_id_depToville:true,
        //         ville_trajet_id_arrToville:true
        //     }
        // })
        console.table(result)
        // res.send({result:result,villes:villedes_villearr})
 
        res.send(result)
    }catch(e){
        console.error(e);

    }

})

export default handler