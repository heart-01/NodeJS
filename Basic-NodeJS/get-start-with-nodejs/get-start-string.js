const txt1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const txt2 = "5"
const txt3 = "      Hello World!      "

const length = txt1.length // 26
const slice = txt1.slice(0, 4) // ตัดคำตั้งแต่ตัวที่ 0-4 จะได้ ABCD
const substr = txt1.substring(0, 4) // ตัดคำตั้งแต่ตัวที่ 0-4 จะได้ ABCD
const substring = txt1.substring(25) // ตัดคำตั้งแต่ตัวที่ 25 จะได้ Z
const replace1 = txt1.replace("ABC", "W3Schools") // แทนที่คำตัวแรก ABC เป็น W3Schools
const replace2 = txt1.replace(/abc/i, "W3Schools") // แทนที่คำตัวแรก ABC เป็น W3Schools โดยไม่จำเป็นต้องเป็นตัวใหญ่
const replace3 = txt1.replace(/ABC/g, "W3Schools") // แทนที่คำ ABC เป็น W3Schools ทั้งหมดของ String
const toUpperCase = txt1.toUpperCase() // เป็นตัวใหญ่
const toLowerCase = txt1.toLowerCase() // เป็นตัวเล็ก
const concat = txt1.concat(" ", txt2, " ", txt3) // รวมสองสตริงขึ้นไป
const trim = txt3.trim() // ลบช่องว่างจากทั้งสองด้านของสตริง
const padStart = txt2.padStart(4,"x") // xxx5
const padEnd = txt2.padEnd(4,"x") // 5xxx
const split = txt3.split(" ") // สตริงสามารถแปลงเป็นอาร์เรย์โดยแยกจาก " "
const indexOf = txt3.indexOf("Hello") // หาตำแหน่งของ String จะคืนค่าเป็น Index ตัวแรกที่เจอ // 6
const lastIndexOf = txt3.lastIndexOf("o") // หาตำแหน่งของ String จะคืนค่าเป็น Index ตัวสุดท้ายที่เจอ // 13
const search = txt3.search("o") // หาตำแหน่งของ String จะคืนค่าเป็น Index ตัวแรกที่เจอ // 10
const includes = txt3.includes("o") // ค้นหาใน String ว่ามีไหมจะ return เป็น true , false

console.log(includes)