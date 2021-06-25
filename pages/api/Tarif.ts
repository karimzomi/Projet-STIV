import {NextApiRequest,NextApiResponse} from 'next'
import nc from "next-connect";
import prisma from "../../Utils/DBconnector"

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
        const villes = await prisma.ville.findMany()        
        res.send({result,villes})
    }catch(e){
        console.error(e);

    }

})

handler.post(async(req,res)=>{
    const body = req.body    
    console.log(body);
    
    const result = await prisma.troncon.create({
        data:{
            prix:body.Prix,
            ville_arr:body.Ville_arr,
            ville_dep :body.Ville_dep,
            code_route:body.Route
            
        }
    })
    res.status(201)
    
    
})
handler.delete((async(req,res)=>{
    if(!req.body){
        res.status(400).send({Error:"Bad Input"})
    }
    
    const result = await prisma.troncon.deleteMany({
        where:{
            id:{in:req.body.params}
        }
    })
    res.send(200)
}))

export default handler