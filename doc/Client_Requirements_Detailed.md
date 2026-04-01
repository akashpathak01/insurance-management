# PAL Insurance Service Ltd - Detailed CRM Software Requirements (Hinglish Version)

Is document mein client ke requirements ko step-by-step aur ek-ek line ke saath explain kiya gaya hai, jo di gayi files (`CRM_Project_Gantt_WBS-details.md`, `pal crm.md.mpp`, aur `image.png`) par based hai.

---

## 1. Project Overview (Software Kya Hai? Aur Kyun Ban Raha Hai?)
Client, **PAL Insurance Service Ltd**, apna ek custom **CRM (Customer Relationship Management)** system develop/redevelop kar raha hai. Iska main goal hai apne insurance business ko digitize aur automate karna.

- **Kisko Milna Hai:** PAL Insurance Service Ltd (Wei Qiao is the main person).
- **Kaun Bana Raha Hai:** VI Professional Solutions Inc. (VIPROS).
- **Timeline:** January 5, 2026 se September 14, 2026 tak (Total 253 days).

---

## 2. Core Functional Requirements (Software Mein Kya-Kya Hoga?)

`image.png` aur MS Project file ke mutabiq, software mein ye sabhi modules aur features hone chahiye:

### A. Core CRM Entities (Basic Data Structure)
System ko ye char (4) primary cheezein manage karni hai:
1.  **Accounts:** Isme companies aur organizations ke records honge.
2.  **Contacts:** Individuals ya personal contacts ki saari details.
3.  **Policies (85% Done):** Insurance policies ko track karne ke liye special module (Abhi configuration phase mein hai).
4.  **Case Open:** Support tickets ya claims ko manage karne ka system.

### B. Custom Development Modules (Special Requirements)
Ye standard CRM se alag aur custom banayi gayi modules hain:
1.  **Connections:** different entities ke beech ka relationship dikhane ke liye (Jaise: Kaunsa contact kis policy se juda hai).
2.  **Products:** PAL jo bhi insurance products offer karta hai, unka poora catalog.
3.  **Net Worth:** Client ki financial position aur net worth track karne ke liye ek tool.

### C. Workflow & Automation (Automatic Kaam Kaise Hoga?)
- **Application Forms:** Staff aur clients ke liye digital forms takki data entry aasaan ho.
- **Automation Rules:** Jaise policy expiry par automatic email ya alert jaana.
- **Document Management:** Insurance ke PDFs, scans aur documents ko store aur manage karne ke liye.

### D. Reporting & Visualization (Dashboard Kaam)
- **Dashboards:** Real-time data dikhane ke liye different charts aur graphs.
- **Notifications:** Milestones aur deadlines ke liye alerts.
- **Departmental Reports:** IT aur Data team ke liye alag se reporting formats.

---

## 3. Technical Requirements (Piche Ka Kaam)
- **API Connections:** Software ko dusre external systems ke sath connect hona zaruri hai.
- **Security (RBAC):** Har user ko uske role ke hisaab se access milega (Sales banda Claims ka data nahi dekh payega).
- **Data Quality:** Purana data (Legacy Data) migration se pehle uski cleansing aur profiling zaruri hai.

---

## 4. Phase-by-Phase Timeline (Kab Kya Hoga?)

- **Phase 1-2 (Initiation & Architecture):** Yeh kaafi hadd tak **100% complete** ho chuka hai. Data model final hai.
- **Phase 3 (Current Phase):** Configuration aur Customization chal raha hai. Isme workflows aur integration ka kaam ho raha hai.
- **Phase 4-5 (Data & Reporting):** June aur July mein purana data migrate hoga aur dashboards final honge.
- **Phase 6 (UAT & Training):** August mein staff system ko test karega (UAT) aur training di jayegi.
- **Phase 7 (Go-Live):** Final launch September mein hoga.

---

## 5. Important Notes for the Project
- **Sequential Dependencies:** Ek phase khatm hone ke baad hi dusra shuru hoga (Pehle data map hoga, phir migrate hoga).
- **Critical Decision:** **June 24, 2026** ko "Go/No-Go" decision liya jayega (Ki system live jaane ke liye taiyaar hai ya nahi).

---
**Summary in Short:**
Yeh ek **Enterprise Level Insurance CRM** hai jisme **Net Worth calculation**, **Policy tracking**, aur **Automated relationship management** ke custom tools hain, taaki PAL Insurance apna sara kaam ek single digital platform par kar sake.
