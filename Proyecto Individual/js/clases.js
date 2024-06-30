export class Tarea{
    constructor(tituloInput, textoInput, id, contenido = null){
        this.info = { titulo: tituloInput, 
                       subtitulo:  textoInput };
        this.id = id;
        if (contenido != null){
            this.contenido = contenido;
        } else {
            this.contenido = '¡No hay nada aqui dentro aún!';
        };
    }

    mostrarPropiedades(){
        return `Esta tarea contiene las siguientes propiedades: Tiulo: ${this.info.titulo}, Subtitulo: ${this.info.subtitulo}, ID: ${this.id}, Contenido: ${this.contenido}.`;
    }
};