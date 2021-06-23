import {NextApiRequest,NextApiResponse} from 'next'
import nc from "next-connect";
import prisma from "../../Utils/DBconnector"
import pool from "../../Utils/DBconnectorPG"

const handler = nc<NextApiRequest,NextApiResponse>()

handler.get(async(req,res)=>{
    try{
        const results = await prisma.trajet.findMany({
            include:{
                ville_trajet_id_arrToville:{
                    select:{
                        nom:true
                    }
                },
                ville_trajet_id_depToville:{
                    select:{
                        nom:true
                    }
                },
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
        const Bus = await prisma.bus.findMany()        
        const ville = await prisma.ville.findMany()        
        res.status(200).send({Trajets:results,Bus,ville})
    }catch(e){
        console.error(e);
        res.status(500)
    }

})
handler.post(async(req,res)=>{
    const body = req.body
    const hd = new Date(body.hd)
    const ha = new Date(body.ha)
    try{
    const Ntrajet = await prisma.trajet.create({
        data:{
            bus_id:body.Bus,
            id_dep:body.Villedep,
            id_arr:body.Villearr,
            hd,
            ha
        }
    })}
    catch (e){
        console.log(e);
        
    }
})
handler.delete(async(req,res)=>{    
    const result = await prisma.trajet.deleteMany({
        where:{
            code: {in:req.body.params}
        }
    })
})
export default handler