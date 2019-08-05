'use strict'

var Project = require('../models/project');

var fs = require('fs');
var path = require('path');

var controller = {
    home : (req,res)=>{
        return res.status(200).send({
            message: 'home'
        });
    },
    test : (req,res)=>{
        return res.status(200).send({
            message: 'Test'
        });
    },
    saveProject: (req,res)=>{
        var project = new Project();
        var params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectSaved)=>{
            if(err) return res.status(500).send({message: "Error al guardar el proyecto"});
            if(!projectSaved) return res.status(404).send({message : "No se ha podido guardar el proyecto"});
            return res.status(200).send({project : project})
        });

    },
    getProject : (req, res)=>{
        var projectId = req.params.id;
        if(projectId == null) return res.status(404).send({message:"Se debe enviar un id"})
        Project.findById(projectId, (err, project)=>{
            if (err) return res.status(500).send({message: "Error al devolver los datos"});
            if(!project) return res.status(404).send({message: "El proyecto no existe"});
            return res.status(200).send({project:project})
        });
    },
    getProjects: (req, res)=>{
        Project.find({}).exec((err,projects)=>{
            if(err) return res.status(500).send({message: "Error al devolver los datos"});
            if(!projects) return res.status(404).send({message:"No hay proyectos para mostrar"});
            return res.status(200).send({projects:projects});
        });
    },
    updateProject: (req, res)=>{
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new:true} ,(err, projectUpdate)=>{
            if(err) return res.status(200).send({message:'Error al actulizar'});
            if(!projectUpdate) return res.status(500).send({message:"No se actualizo el proyecto"});
            return res.status(200).send({projectUpdate: projectUpdate})
        });
    },
    deleteProject: (req, res)=>{
        var projectId = req.params.id;
        Project.findByIdAndDelete(projectId, (err, projectRemoved)=>{
            if(err) return res.status(500).send({message: "No se pudo borrar el proyecto"});
            if(!projectRemoved) return res.status(404).send({message: "Error al borrar el proyecto"})
            return res.status(200).send({project: projectRemoved});
        });
    },
    uploadImage: (req,res)=>{
        var projectId = req.params.id;
        var fileName = 'Imagen no subida';
        
        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' ||fileExt == 'jpg' ||fileExt == 'jpeg' ||fileExt == 'gif' ){
            
            Project.findByIdAndUpdate(projectId , {image:fileName}, {new:true}, (err, projectUpdate)=>{
                if(err) return res.status(500).send({message: 'Error al subir la imagen'});
                if(!projectUpdate) return res.status(404).send({message: 'El proyecto no existe'});
                return res.status(200).send({project: projectUpdate}); 
            });

            }
            else{
                fs.unlink(filePath, (err)=>{
                    return res.status(200).send({message:'La extension no es valida'})
                })
            }


        }
        else{
            return res.status(200).send({message: fileName});
        }



    },
    getImageFile: (req,res)=>{
         
        var file = req.params.image;
        var path_file = './uploads/'+file;
        

        fs.exists(path_file, (exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }
            else{
                console.log('else');
             return res.status(200).send({message: 'no existe la imagen'});
            }
        });     
    }
    


}

module.exports = controller;