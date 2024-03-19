import io from "socket.io-client"

export let socket = null
export const turnOnIo = ()=>{
    socket = io.connect("http://localhost:5000")
    console.log("Io is on")
}

export const turnOffIo = ()=>{
    socket.off()
    console.log("Io is off")
} 