# PAL Insurance - CRM Software Wireframe & Project Flow (Hinglish Guide)

Is document mein CRM ka **UI/UX Wireframe** aur **System Flow** (kaam kaise chalega) detail mein samjhaya gaya hai.

---

## 1. Visual Mockup (Dashboard Preview)
*(Imagine a Sleek Dark Mode UI with Glassmorphism components for Charts and Stats).*

- **Top Bar:** Search Bar (Policy/Account search), Notifications (Alerts for expiry), Profile Settings.
- **Left Sidebar:** Dashboard, Accounts, Contacts, Policies, Products, Net Worth, Case Open, Documents.

---

## 2. Page-wise Wireframe Layout

### A. Main Dashboard (Home Screen)
- **Summary Cards:** Total Active Policies, Open Claims/Cases, Monthly Revenue Growth.
- **Quick Actions:** `+ New Account`, `+ Add Policy`, `+ Open Case`.
- **Primary Chart:** Policy distribution (e.g., Live vs. Pending).
- **Recent Activity:** Last 5 updates on any account or policy.

### B. Accounts & Contacts Module
- **Searchable Table:** Account Name, Primary Contact, Status (Active/Inactive), Total Policies.
- **Action Menu:** Edit, Delete, or "Link to another Account" (Connections).

### C. Policy Management (Core Feature)
- **Policy Detail Page:** Policy Number, Expiry Date, Coverage Amount, Linked Documents.
- **Status Indicator:** Progress bar showing if the policy is "Active", "In-review", or "Expiring Soon".

### D. Net Worth Tracker (Custom Tool)
- **Financial Grid:** Client Assets vs. Liabilities.
- **Visualization:** Graph showing the net worth trend over the last 12 months.

---

## 3. Step-by-Step Project Flow (Kaam Ka Flow)

### Flow 1: Naya Client Onboarding
1.  **Staff:** `Accounts` module mein jaakar `New Account` create karta hai.
2.  **System:** Ek blank profile generate karta hai.
3.  **Staff:** Client ki **Net Worth** aur basic **Contacts** fill karta hai.
4.  **Action:** Account is now "Ready for Policy".

### Flow 2: Policy Issue Karna
1.  **Staff:** Account profile se `Add Policy` click karta hai.
2.  **Product Selection:** `Products` catalog se insurance plan choose karta hai.
3.  **Docs Upload:** Client ke IDs aur contracts upload kiye jaate hain (`Documents` module).
4.  **Finalize:** Policy active ho jaati hai aur Dashboard par count badh jata hai.

### Flow 3: Case/Claims Management
1.  **Trigger:** Client calls for a claim.
2.  **Staff:** `Case Open` module mein naya record banata hai aur use relevant **Policy** ke sath link karta hai.
3.  **Internal Flow:** Case manager review karta hai (Status changes: `New` -> `Review` -> `Resolved`).
4.  **Final:** Case close hota hai aur history save ho jati hai.

---

## 4. Key Automation (Piche Ka Logic)
- **Expiry Alerts:** Policy expiry se 30 din pehle automatic notification staff ko mil jayega.
- **Relationship Linking:** Agar ek contact do accounts se juda hai, to **Connections** module use automatic link kar dega.
- **Data Quality Check:** System duplicate names ya invalid phone numbers ko flag karega.

---
**Wireframe Summary:**
PAL CRM ka interface ek **Modern Dashboard** ki tarah hai, jisme data visual aur navigation aasaan hai (All modules accessible within 2-3 clicks). 

*(Maine ek high-quality mockup image bhi generate ki thi, jiske reference se is flow ko design kiya gaya hai).*
