# 🚀 KitchenPulse AI: ระบบปฏิบัติการครัวอัจฉริยะ (Smart Kitchen OS)
> **"คุมเวลาการทำ และล็อคความถูกต้องก่อนถึงมือลูกค้า"**  
> *การผสานพลังระหว่าง **Kitchen Twin AI** (ระบบบริหารการไหลและคาดการณ์คอขวด) และ **TrustPlate AI** (ระบบตรวจความถูกต้องของจานอาหารก่อนเสิร์ฟ)*

---

## 💡 Core Value Proposition & Concept

KitchenPulse AI ไม่ใช่แค่ระบบ POS ทั่วไป แต่คือ **"AI Operations Co-Pilot"** สำหรับร้านอาหารขนาดเล็กถึงขนาดกลาง (SMB Restaurants) ที่ออกแบบมาเพื่อแก้ปัญหาสำคัญ 2 ด้านพร้อมกันในจุดเดียว (**End-to-End Solutions: Speed + Accuracy**):

1. **Speed & Bottleneck Control (จาก Kitchen Twin AI):** คาดการณ์ความล่าช้า แจ้งเตือนสถานีปรุงอาหารที่เกิดคอขวด (Bottleneck) พร้อมระบบ AI คำนวณการจัดคิวอัตโนมัติ (AI Queue Optimization)
2. **Quality & Accuracy Lock (จาก TrustPlate AI):** ตรวจเช็คภาพถ่ายจานอาหารด้วย Computer Vision AI ก่อนเสิร์ฟ เพื่อยืนยันความถูกต้องตามออเดอร์และเงื่อนไขพิเศษ (Special Requests / Food Allergies)

---

## 🎯 Project Overview & Hackathon Scope (4.30 Hours MVP)

สร้าง **Single-Flow Web Application (1 Core Web App)** ที่ครอบคลุม 3 หน้าจอหลักสำหรับการสาธิต (Demo 2-3 นาที):

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          KitchenPulse AI Flow                           │
├─────────────────────────┬───────────────────────┬───────────────────────┤
│  1. Kitchen Flow Board  │  2. AI Bottleneck     │  3. AI QC Gate Guard  │
│     (Order Management)  │     Recommendation    │     (TrustPlate AI)   │
│                         │     Panel             │                       │
│  - Real-time Orders     - Alert: Cook Bottleneck - Photo Upload / Cam     │
│  - Special Request Tag  - Button: "AI Optimize" - Vision Model Analysis│
│  - Multi-Station Status - Auto Re-queue Logic   - Result: PASS / FAIL   │
└─────────────────────────┴───────────────────────┴───────────────────────┘
```

---

## ⏳ แผนบริหารเวลา 4 ชั่วโมง 30 นาที (Action Plan)

| Phase | เวลา | กิจกรรมหลัก (Key Tasks) | Deliverables |
| :--- | :--- | :--- | :--- |
| **Phase 1** | `00:00 - 00:30` (30 นาที) | **Architecture & Data Mocking**<br>• Setup Project Architecture<br>• Prepare JSON Dataset & Image Assets | • Next.js / React + Tailwind CS Setup<br>• 8 Mock Orders (มมส. Local Menu)<br>• 4-5 Sample Food Images |
| **Phase 2** | `00:30 - 02:00` (90 นาที) | **Core Frontend Development**<br>• Kanban Order Board<br>• Kitchen Station Heatmap<br>• QC Modal Popup | • UI Dashboard สำหรับ Order Flow<br>• Visual Indicators สีเขียว/เหลือง/แดง<br>• Modal สำหรับตรวจภาพอาหาร |
| **Phase 3** | `02:00 - 03:30` (90 นาที) | **AI Logic & API Integration**<br>• Kitchen Bottleneck Algorithm<br>• Vision AI API Integration | • Function คำนวณคอขวด & Re-queue<br>• OpenAI / Gemini Vision Prompt & JSON Response |
| **Phase 4** | `03:30 - 04:30` (60 นาที) | **Testing & Demo Pitch Prep**<br>• End-to-End Walkthrough Test<br>• Pitch Slide (5-6 Pages) Preparation | • Bug-free Demo Flow (3 min)<br>• Slide Pitching เน้น Business Value |

---

## 🛠️ รายละเอียดการพัฒนาแต่ละ Phase

### Phase 1: Data Mocking & Setup (`0:00 - 0:30`)
- **Tech Stack:** Next.js (App Router) / React + Tailwind CSS + Shadcn UI
- **Mock Dataset (`/data/orders.json`):**  
  จำลองออเดอร์ร้านอาหารรอบ มมส. (ขามเรียง / หน้ามอ) จำนวน 8 รายการ เช่น:
  - **โต๊ะ 3:** กะเพราหมูสับ - *ไม่ใส่ผักชี, เพิ่มไข่ดาว* (สถานี: ผัด)
  - **โต๊ะ 5:** ต้มยำกุ้งน้ำข้น - *เผ็ดน้อย* (สถานี: ต้ม)
  - **โต๊ะ 8:** ข้าวผัดไก่ - *ไม่ใส่หอมใหญ่* (สถานี: ผัด)
- **Image Assets (`/public/qc-images/`):**
  - `kaprao-coriander.jpg` (กะเพรามีผักชี - สำหรับเคส FAIL)
  - `kaprao-clean.jpg` (กะเพราไม่มีผักชี มีไข่ดาว - สำหรับเคส PASS)
  - `tomyum-correct.jpg`

---

### Phase 2: Frontend Layout (`0:30 - 2:00`)
1. **Kitchen Flow Board (Kanban Style):**  
   แสดงการ์ดออเดอร์แบ่งตามสถานะ: `Received` → `Cooking` → `Pending QC` → `Served`
2. **Kitchen Health Bar (Heatmap Status):**  
   แสดงโหลดงานของแต่ละสถานี (สถานีผัด, สถานีต้ม, สถานีทอด) ด้วยป้ายสี:
   - 🟢 **Normal:** งานน้อยกว่า 2 จาน
   - 🟡 **Warning:** งาน 3 จาน
   - 🔴 **Critical Bottleneck:** งานค้าง > 3 จาน ( trigger AI Alert)
3. **QC Modal Popup:**  
   เมื่อผู้ใช้คลิกปุ่ม **"ตรวจจานอาหาร"** บนการ์ดสถานะ `Pending QC` จะเปิด Modal สำหรับอัปโหลดรูปหรือเลือกรูปจำลองเพื่อส่งเข้า AI Vision

---

### Phase 3: AI Integration & Backend Logic (`2:00 - 3:30`)

#### 1. Bottleneck & Queue Logic (Kitchen Twin Module)
```typescript
// Example Logic Overview
function checkStationBottleneck(orders: Order[]) {
  const fryingStation = orders.filter(o => o.station === 'ผัด' && o.status === 'Cooking');
  if (fryingStation.length >= 3) {
    return {
      isBottleneck: true,
      message: "⚠️ สถานีผัดล้น! โต๊ะ 3 และ โต๊ะ 8 เสี่ยงล่าช้าอีก 10 นาที",
      suggestedAction: "Batch ปรุงเมนูกะเพราพร้อมกัน / กระจายงานไปสถานีสำรอง"
    };
  }
  return { isBottleneck: false };
}
```

#### 2. Vision AI Integration (TrustPlate Module)
- **API Endpoint:** OpenAI API (`gpt-4o-mini`) หรือ Google Gemini API (`gemini-1.5-flash`)
- **System Prompt Format:**
```text
คุณคือระบบ AI Quality Control (TrustPlate) ประจำร้านอาหาร 
จงวิเคราะห์ภาพถ่ายจานอาหารที่ได้รับ เทียบกับเงื่อนไขออเดอร์ต่อไปนี้:
- เมนู: {menu_name}
- คำขอพิเศษ (Special Requests): {special_requests}

ให้ตอบกลับในรูปแบบ JSON Only:
{
  "status": "PASS" | "FAIL",
  "confidence": number,
  "detected_issues": [string],
  "reasoning": "อธิบายเหตุผลภาษาไทย"
}
```

---

### Phase 4: Polish, Test & Pitch Slide (`3:30 - 4:30`)
- **Testing Script:** ทดสอบตาม Sequence การนำเสนอ
- **Slide Deck (5-6 Slides):**
  1. **Title & Problem:** ร้านอาหารเสียชื่อเสียงจาก "ส่งช้า" และ "ทำผิดคำขอพิเศษ"
  2. **The Solution:** KitchenPulse AI (Speed + Quality Control in One)
  3. **Product Demo:** แสดง Flow การทำงานจริง (Live Demo)
  4. **Traction & Mahasarakham Model:** แผนนำร่องร้านอาหารรอบ มมส. (ขามเรียง/หน้ามอ)
  5. **Business & Pricing Model:** SaaS Subscription Strategy

---

## 🎬 โครงเรื่องสำหรับ Demo บนเวที (3 นาที Script)

| เวลา | สิ่งที่ต้องแสดงบนหน้าจอ | บทพูดเน้นย้ำ (Storytelling Script) |
| :--- | :--- | :--- |
| **0:00 - 0:45** | เปิดหน้า **Kitchen Twin Board**<br>เห็นป้ายสีแดงเตือนที่สถานีผัด | *"ร้านอาหารทั่วไปไม่ได้เสียลูกค้าเพราะอาหารไม่อร่อยอย่างเดียวครับ แต่เสียเพราะ 'ทำช้า' และ 'ทำผิด' ตอนนี้โต๊ะ 3 รอเกิน SLA แล้ว เพราะสถานีผัดเกิดคอขวด มีออเดอร์ชนกันถึง 4 จาน"* |
| **0:45 - 1:30** | กดปุ่ม **"AI Optimize Queue"** | *"พนักงานไม่ต้องเสียเวลาจัดคิวเอง AI วิเคราะห์วัตถุดิบและคำนวณคิวใหม่ทันที รวมการผัดฐานเดียวกัน ลดเวลารวมในครัวลงได้กว่า 30% ทันที"* |
| **1:30 - 2:15** | กดตรวจจาน **"โต๊ะ 3: กะเพราหมู - ไม่ใส่ผักชี"**<br>อัปโหลดรูปกะเพราที่มีผักชี | *"เมื่อปรุงเสร็จ ด่านสุดท้ายก่อนถึงมือลูกค้าคือ TrustPlate AI... พนักงานถ่ายรูปตรวจจาน ระบบสแกนพบ 'ผักชี' ซึ่งขัดกับคำขอพิเศษ! ระบบขึ้นเตือน FAIL ทันที พร้อมล็อคไม่ให้กดเสิร์ฟ ป้องกันลูกค้าแพ้หรือรีวิว 1 ดาว"* |
| **2:15 - 3:00** | อัปโหลดรูปที่แก้ไขแล้ว (ไม่มีผักชี)<br>ขึ้น **PASS** + แสดง Dashboard สรุป Impact | *"เมื่อเชฟหยิบผักชีออกแล้วถ่ายใหม่ AI ตรวจสอบผ่าน PASS! ระบบนี้ช่วยลดการทำอาหารซ้ำ คุมคุณภาพ 100% เริ่มต้นแพ็กเกจ SaaS เพียง 799 บาท/เดือน นำร่องย่านขามเรียง มมส. ครับ"* |

---

## 💰 Business Model & Local-to-National Strategy

### 📌 1. Go-To-Market Strategy (Mahasarakham Model)
- **Target Group:** ร้านอาหารตามสั่งขนาดใหญ่, ร้านชาบู/ปิ้งย่าง, และร้านอาหารย่านขามเรียง / หน้ามหาวิทยาลัยมหาสารคาม (มมส.) ที่มีออเดอร์หนาแน่นช่วงชั่วโมงเร่งด่วน (11:30 - 13:30 น. และ 17:00 - 20:00 น.)
- **Value Proposition:** ลดข้อผิดพลาดในครัว ป้องกันการทำอาหารคืน/ทำซ้ำ (Food Waste & Cost Control)

### 💳 2. Monetization Tiers (SaaS Model)

```
┌───────────────────────────┬───────────────────────────┐
│       Starter Plan        │         Pro Plan          │
│       799 THB / เดือน      │      1,499 THB / เดือน     │
├───────────────────────────┼───────────────────────────┤
│ • Kitchen Flow Board      │ • รวมฟีเจอร์ Starter ทั้งหมด  │
│ • AI Bottleneck Predictor │ • TrustPlate AI QC Vision │
│ • Queue Optimization      │ • Special Request Guard   │
│ • Real-time Heatmap       │ • Advanced Analytics      │
└───────────────────────────┴───────────────────────────┘
```

### 🚀 3. Scale-up Strategy
- **POS & Delivery Integration:** พัฒนา API/Add-on เชื่อมต่อกับระบบ POS และ Delivery Platforms (Foodpanda, Grab, Lineman) เพื่อสแกนคิวย้อนหลัง และสแกนอาหารก่อนส่งมอบให้ไรเดอร์ (Rider Handover Verification)
