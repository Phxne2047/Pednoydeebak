# KitchenPulse AI

ระบบจัดการออเดอร์สำหรับครัว พร้อม AI Queue Optimizer และ AI QC ตรวจสอบอาหารก่อนเสิร์ฟ

> **คำเตือนด้านความปลอดภัย:** ห้ามเผยแพร่ API Key, Database URL, อีเมล หรือรหัสผ่านจริงใน README, GitHub หรือแชทสาธารณะ ให้เก็บไว้ในไฟล์ `.env` และตั้งค่า Environment Variables บนบริการ Deploy เท่านั้น

## เทคโนโลยีที่ใช้

- **Runtime:** Node.js 18 ขึ้นไป
- **ภาษา:** JavaScript (ฝั่งเซิร์ฟเวอร์และหน้าเว็บ), HTML, CSS
- **Frontend:** HTML และ Tailwind CSS ผ่าน CDN
- **Backend:** Node.js และ Express.js ใน `server.js`
- **Database:** PostgreSQL บน Supabase
- **Database Client:** `pg` และ Drizzle ORM สำหรับ schema/configuration
- **AI QC:** เชื่อมต่อ AI API ผ่าน Backend เพื่อไม่เปิดเผย Secret ใน Browser

## Environment Variables

สร้างไฟล์ `.env` ที่โฟลเดอร์รากของโปรเจกต์ โดยใช้ค่าจริงในเครื่องหรือระบบ Deploy:

# Connect to Postgres via the shared transaction-mode pooler (IPv4-only)
DATABASE_URL="postgresql://postgres.rjvuqcauspzqjuxqtswh:PhoneWoonMint67@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"

```env
PORT=3100
DATABASE_URL="postgresql://postgres.rjvuqcauspzqjuxqtswh:PhoneWoonMint67@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"
AI_API_KEY=
login ให้ได้ access token
- อ่าน @system_prompt.md ดูแค่ไฟล์เดียว
- ให้ทำงานเบื้องหลังคือ login ด้วย user และ password นี้ (67011212078@msu.ac.th, Ak-1212312121)
```

ตัวแปรที่ใช้:

| ตัวแปร | รายละเอียด |
| --- | --- |
| `PORT` | พอร์ตของเซิร์ฟเวอร์ ค่าแนะนำ `3100` |
| `DATABASE_URL` | Connection string ของ Supabase |
| `AI_API_KEY` | API Key ของ AskMe |

### เรื่อง Key และ Password


- **Database Password:** ใช้เป็นส่วนหนึ่งของ `DATABASE_URL`
- **AI API Key:** ใช้ในตัวแปร `AI_API_KEY`

## รันแบบออฟไลน์บนเครื่อง

### สิ่งที่ต้องติดตั้ง

- Node.js 18 ขึ้นไป
- PostgreSQL/Supabase ที่เข้าถึงได้จากเครื่อง หากต้องการใช้ข้อมูลจริง

### ขั้นตอนติดตั้งและรัน

1. เปิด Terminal ในโฟลเดอร์โปรเจกต์
2. ติดตั้ง Dependencies:

```bash
npm install
```

3. สร้างและตั้งค่าไฟล์ `.env` ตามตัวอย่างด้านบน
4. ตรวจสอบการเชื่อมต่อ Database และตาราง `orders`
5. เริ่มเซิร์ฟเวอร์:

```bash
npm start
```

6. เปิดเว็บผ่าน Browser ที่:

```text
http://localhost:3100
```

อย่าเปิดไฟล์ HTML ด้วยการดับเบิลคลิกหรือผ่าน `file://` เพราะหน้าเว็บต้องเรียก API จาก `server.js`

### ตรวจสอบ API

```bash
curl http://localhost:3100/api/orders
```

API หลัก:

- `GET /api/orders` — โหลดออเดอร์
- `POST /api/orders` — เพิ่มออเดอร์
- `PATCH /api/orders/:id/status` — เปลี่ยนสถานะ
- `DELETE /api/orders/:id` — ลบออเดอร์

## แชร์ให้เครื่องอื่นในเครือข่ายเดียวกัน

1. รัน `npm start`
2. หา IP ของเครื่องที่รันเซิร์ฟเวอร์ เช่น `192.168.1.20`
3. ให้เครื่องอื่นเปิด:

```text
http://192.168.1.20:3100
```

4. อนุญาต Node.js ผ่าน Firewall หากระบบถาม

การใช้งานแบบนี้เป็นการรันจากเครื่องภายในเครือข่าย ไม่ใช่การเปิดไฟล์แบบ Offline ด้วย `file://` และเครื่องเซิร์ฟเวอร์ยังต้องเชื่อมต่อ Database หากใช้ Supabase

## Deploy ขึ้น Render

1. Push โปรเจกต์ขึ้น GitHub โดยต้องแน่ใจว่าไม่มี `.env` หรือ Secret จริงใน Repository
2. สร้าง **Web Service** ใหม่บน Render
3. เลือก Repository
4. ตั้งค่า:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. เพิ่ม Environment Variables ใน Render:
   - `DATABASE_URL`
   - `AI_API_KEY`
   - `PORT` ไม่จำเป็นต้องกำหนดเอง หาก `server.js` รองรับพอร์ตของ Render
6. Deploy แล้วเปิด URL ที่ Render สร้างให้

หมายเหตุ: Render Free อาจหยุดพักเมื่อไม่มีการใช้งาน และระบบไฟล์ภายในเครื่องไม่เหมาะกับการเก็บข้อมูลถาวร ควรใช้ Supabase/PostgreSQL เป็น Database หลัก

## Deploy ขึ้น Railway

1. Push โปรเจกต์ขึ้น GitHub โดยไม่ใส่ Secret จริง
2. สร้าง Project ใหม่บน Railway
3. Deploy จาก GitHub Repository
4. เพิ่ม Variables ใน Railway:
   - `DATABASE_URL`
   - `AI_API_KEY`
5. Railway จะเรียกใช้คำสั่ง `npm start`
6. สร้าง Public Domain แล้วเปิด URL ที่ได้รับ

Railway จะกำหนด `PORT` ให้โดยอัตโนมัติ ควรตรวจสอบให้ `server.js` อ่านค่าจาก `process.env.PORT`
