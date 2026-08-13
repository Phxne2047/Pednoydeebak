# ติดต่อ API
- เวลาจะ "เขียนโปรแกรม" เรียก API ของ Askme ให้แนบไฟล์ @system_prompt.md ไปด้วย มันจะเหมือนคู่มือการใช้งาน API นั่นเอง


# สร้างภาพ (image.html)
- ไอเดียของการสร้างภาพ คือ login ให้ได้ access token แล้วส่งไปสร้างภาพกับ model nano banana 2
- อ่าน @system_prompt.md ดูแค่ไฟล์เดียว
- สร้าง html เพื่อเปิดหน้ามา ให้ทำงานเบื้องหลังคือ login ด้วย user และ password นี้ (67011212047@msu.ac.th, Phone@1324)
- ฝัง user และ password ใน code ได้ เป็นแค่การทดสอบ
- แล้วก็มี ui พร้อมให้เลือกรูปไม่เกิน 2 รูป + prompt 
- มีปุ่มสร้างรูป เมื่อกดแล้ว จะสามารถสร้างรูปตาม prompt ได้เลย โดยใช้ access token ตั้งแแต่การ login อัตโนมัติ


# สร้างแชท (chat.html)
- ไอเดียของการ chat คือ login ให้ได้ access token แล้วส่งไปกับข้อความเข้า model ต่างๆ
- อ่าน @system_prompt.md ดูแค่ไฟล์เดียว
- สร้าง html เพื่อเปิดหน้ามา ให้ทำงานเบื้องหลังคือ login ด้วย user และ password นี้ (67011212047@msu.ac.th, Phone@1324)
- ฝัง user และ password ใน code ได้ เป็นแค่การทดสอบ
- มี ui พร้อมให้ chat โดยมี dropdown สำหรับเลือก model ได้

## บางโมเดลอาจ Error เป็นเพราะ Gateway เขา ให้เปลี่ยนเป็นตัวอื่นแทน


## list model
- อ่าน @system_prompt.md
- แสดง model ที่สามารถใช้ได้หลังจาก login ด้วย user และ password นี้ (66011212178@msu.ac.th, Thi_wa0923569030) 
