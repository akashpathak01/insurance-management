# PAL Insurance CRM - Product Requirement Document (PRD)

Is document mein **Roles, Permissions, Sidebar Visibility, aur Access Management** ko detail mein samjhaya gaya hai taaki aap iske mutabiq UI/Frontend build kar sakein.

---

## 1. User Roles & Access Management

Is CRM mein total **char (4) roles** honge. Har role ki apni zimmedari aur platform par access limit hogi.

| Role Name | Access Provider (Kaun login dega?) | Key Responsibility |
| :--- | :--- | :--- |
| **Super Admin** | System Initializer (Developer) | Poore platform ka control, system settings, aur naye Admin ya Managers add karna. |
| **Manager** | Super Admin | Teams ko manage karna, dashboards par poora data dekhna, aur cases/claims ko approve karna. |
| **Staff / Agent** | Super Admin or Manager | Accounts aur Contacts add karna, Policies create karna, aur Documents upload karna. |
| **Underwriter / Viewer**| Manager | Data ko review karna aur claims ki validity check karna. Edit access bohot limited hoga. |

---

## 2. Sidebar Menu Visibility (Role-wise)

Sidebar menu har role ke liye alag dikhega taaki security bani rahe aur UI clutter-free ho.

| Sidebar Menu Item | Super Admin | Manager | Staff / Agent | Underwriter |
| :--- | :---: | :---: | :---: | :---: |
| **Dashboard** (Summary) | ✅ Yes | ✅ Yes (Full) | ✅ Yes (My Data) | ✅ Yes (View) |
| **Accounts** (Companies) | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes (View) |
| **Contacts** (People) | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes (View) |
| **Policies** (Insurance) | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes (View) |
| **Products Catalog** | ✅ Yes | ✅ Yes | ✅ Yes (View) | ✅ Yes (View) |
| **Net Worth Tracker** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Case Open (Claims)** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes (Review) |
| **Documents** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **User Management** | ✅ Yes | ✅ Yes | ❌ No | ❌ No |
| **System Settings** | ✅ Yes | ❌ No | ❌ No | ❌ No |

---

## 3. Detailed Workflow by Role

### A. Super Admin (Control Level)
- **Work:** Admin dashboard check karna, API integrations manage karna, aur naye users add karke login credentials dena.
- **Login Access:** Yeh manually `User Management` se `Invite User` karke login access dispatch karenge.

### B. Manager (Operation Level)
- **Work:** Departmental reports ki validation karna (WBS Phase 5.2 ke mutabiq).
- **Control:** Apne under wale staff ka kaam check karna aur system ki data quality monitor karna.

### C. Staff / Agent (Execution Level)
- **Work:** Inka kaam sabse jyada data entry ka hai. Naye Accounts banana, Documents upload karna, aur Policy issue karna.
- **UI Focus:** Inko `Add New` ke buttons front par dikhne chahiye.

### D. Underwriter / Viewer (Audit Level)
- **Work:** Inka main kaam policies aur claims ko final approve karne aur review karne ka hai. Inhe change history (Audit Log) dikhna chahiye.

---

## 4. UI/Frontend Build Guide (UI Build Karne Ke Liye Tips)

1.  **Role-Based Rendering:** Frontend logic mein current user ka role check karein. Agar role `Staff` hai, to sidebar se `User Management` aur `Settings` hata dein.
2.  **Dashboard Differentiation:** 
    - **Manager** ko poore department ka summary chart dikhayein.
    - **Staff** ko sirf uski apni assigned policies aur upcoming expiries dikhayein.
3.  **Access Control:** Agar user direct URL se kisi unauthorised page (jaise Settings) par jaane ki koshish kare, to use "403 Forbidden" screen dikhayein.
4.  **Audit Logs:** Har important change (Jaise: Policy delete karna ya Case status Badalna) par "Jis bande ne change kiya" uska naam save hona chahiye.

---

## 5. Security & Login Flow
1.  **Login:** Email aur Password based secure login. (Social login ki zarurat client ne abhi mention nahi ki hai).
2.  **Session:** Login ke baad JWT ya Session ID generate hogi jo user role ko identify rakhegi.
3.  **Password Reset:** Reset link sirf Admin ya Manager hi trigger kar sakta hai.









>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
## 6. Detailed Module & UI Component Breakdown (Role-wise)

Is section mein har role ke liye sidebar menu ke andar kya details dikhengi aur "Add/Edit" modals mein kya actions honge, sab detail mein diya gaya hai.

### 6.1 Super Admin (System Master)
*   **Sidebar Menus:**
    *   **User Management:** List of all staff. **Modal:** Add/Edit Role, Suspend User, Reset Password.
    *   **System Settings:** API keys, Email SMTP, Logo change. **Modal:** Edit Configuration.
    *   **Audit Logs:** View every action done by anyone. **Details:** Timestamp, User ID, Action, Affected Record.
    *   **Global Dashboard:** System performance metrics & Database health.

### 6.2 Manager (Operational Lead)
*   **Sidebar Menus:**
    *   **Team Dashboard:** Revenue chart, Team productivity stats.
    *   **All Policies:** Filter by Agent, Date, or Status. **Modal:** Verify/Approve Policy.
    *   **Approvals Queue:** Pending claims/cases. **Modal:** Approve/Reject with Comment box.
    *   **Reporting:** Custom report export (CSV/PDF). **Details:** Select Date Range & Department.

### 6.3 Staff / Agent (Execution Specialist)
*   **Sidebar Menus:**
    *   **My Leads / Accounts:** Client list. **Modal:** Add New Account (Fields: Name, Phone, Email, Address, Source).
    *   **My Policies:** Create & Manage policy. **Modal:** New Policy Wizard (Fields: Product Type, Premium, Tenure, Policy Start Date).
    *   **My Net Worth Tracker:** Calculate client wealth. **Modal:** Add Asset/Liability (Fields: Asset Type, Market Value).
    *   **Current Cases:** Assigned claims. **Modal:** Update Status (New -> Document Received -> Review).

### 6.4 Underwriter / Viewer (Audit & Review)
*   **Sidebar Menus:**
    *   **Policy Review:** View all policies but cannot edit primary fields. **Details:** Full Policy details + All linked documents.
    *   **Claims Review:** Access case data for verification. **Modal:** Add Private Note/Observation (Visibility: Manager only).
    *   **Audit History:** View version history of a claim (What changed?).

---

## 7. Modal & Action Form Details (Specific Fields)

Har "Add New" button par jo Modal/Pop-up open hoga, usme ye fields honge:

1.  **Add Account Modal:**
    *   Name (Required), Email (Email format), Phone (Masked), Address (Textarea), Business Type (Dropdown).
2.  **Add Policy Modal:**
    *   Account Selection (Searchable Dropdown), Product Selection (Select from catalog), Coverage Amount (Number), Tenure (Years), Docs Attachment (File Upload).
3.  **Update Case Modal:**
    *   Current Status (Read-only), New Status (Dropdown), Resolution Notes (Textarea).
4.  **Add/Edit User Modal (Super Admin only):**
    *   Full Name, Designation, Email, Role Selection (Dropdown), Assigned Department.

---
**PRD End.** (Note: Yeh document CRM build karne ke liye layout aur flow ka final reference hai).






