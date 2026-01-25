import {ZodError} from 'zod';

export const validation= (schema)=>(req, res, next)=>{
    try {
        schema.parse(req.body);
        next()
    } catch (err) {
        if(err instanceof ZodError){
            return res.status(400).json({
                errors: err.errors.map(e=>e.message)
            })
        }
        return res.status(500).json({message: "Server error",error});
    }

}