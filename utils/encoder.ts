import { Buffer } from "buffer";
import { buffer } from "stream/consumers";

class Shortener{
    encode(link_number: number): string{
        const numBytes = Buffer.alloc(4)
        numBytes.writeUint32BE(link_number, 0)
        return numBytes.toString("base64").replace("==",'')
    }
    decode(hash: string){
        return ""
    }

}

export default new Shortener()

