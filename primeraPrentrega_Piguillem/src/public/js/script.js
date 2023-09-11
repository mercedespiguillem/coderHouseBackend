//const socket = io()



const socket = io()

const chatButton = document.getElementById('chatButton')
const menssages = document.getElementById('parrafosMensajes')
const valInput = document.getElementById('chatBox')
let user


socket.emit('mesajeConexion', { user: "Mercedes", rol: "Admin" })

socket.on('credencialesConexion', (info) => {
    console.log(info)
}) 

Swal.fire({
    title: "Identificacion de usuario",
    text: "Por favor ingrese su nombre de usuario",
    input: "text",
    inputValidator: (valor) => {
        return !valor && "Ingrese su nombre de usuario valido"
    },
    allowOutsideClick: false
}).then(resultado => {
    user = resultado.value
    console.log(user)
})

chatButton.addEventListener('click', () => {
    let fechaActual = new Date().toLocaleString()

    if (valInput.value.trim().length > 0) {
        socket.emit('mensaje', { fecha: fechaActual, user: user, mensaje: valInput.value })
        valInput.value = ""
        socket.on()
    }
})

socket.on('mensajes', (arrayMensajes) => {
    parrafosMensajes.innerHTML = ""
    arrayMensajes.forEach(mensaje => {
        parrafosMensajes.innerHTML += `<p>${mensaje.fecha}: el usuario ${mensaje.user} escribio ${mensaje.mensaje} </p>`
    })
})