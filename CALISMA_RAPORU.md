# SmartWarehouseManagementSystem
# 📦 Smart Warehouse Management System - Çalışma Raporu

Bu proje, bir akıllı depo yönetim sisteminin temel operasyonlarını (CRUD) ve dashboard yönetimini kapsayan bir full-stack geliştirme çalışmasıdır.

---

## 🚀 1. Proje Özeti
Sistem, depoların stok durumlarını şirket bazlı izlemek, yeni ürün girişi yapmak ve verileri güvenli bir şekilde yönetmek amacıyla geliştirilmiştir. Şu anki sürümde temel listeleme ve veri yönetim döngüsü kurulmuştur.

### ✅ Tamamlanan Fonksiyonlar
* **Dashboard Özet Kartları:** Toplam stok miktarı, ürün çeşitliliği ve toplam maliyet verileri veritabanından anlık hesaplanarak sunulmaktadır.
* **Sunucu Taraflı Listeleme:** Binlerce veriyi performanslı işlemek adına `Server-Side Pagination` ve `Search` özellikleri entegre edilmiştir.
* **Güvenli Silme (Soft Delete):** Veriler fiziksel olarak silinmez; `IsDeleted` bayrağı ile işaretlenerek sistemde korunur.

### ⚠️ Mevcut Eksikler ve Yol Haritası
* **Şirket Seçici (Dinamik ID):** Şu an `companyId` kod tarafında manuel değiştirilmektedir. Gelecek sürümde UI üzerinden seçim yapılacaktır.
* **Düzenleme Modülü:** Ürün bilgilerini güncellemek için gerekli arayüz geliştirme aşamasındadır.

---

## 🛠 2. Kullanılan Teknolojiler
| Teknoloji | Kullanım Amacı | Versiyon |
| :--- | :--- | :--- |
| **React** | Frontend Arayüz | v18+ |
| **TypeScript** | Tip Güvenliği | v5+ |
| **Material UI** | Component Kütüphanesi | v5 |
| **.NET 9** | Backend API | v9.0 |
| **EF Core** | ORM / Veritabanı Yönetimi | v8.0 |
| **Axios** | API İstek Yönetimi | v1.x |

---

## 🧩 3. Mimari Kararlar ve Nedenleri
1. **HTTP POST for Soft Delete:** Silme işlemi teknik olarak bir güncelleme olduğu için ve gövdede (Body) `DeleteProductDto` taşındığı için `POST` metodu tercih edilmiştir.
2. **Hybrid Route-Body Mapping:** Silme isteğinde güvenliği artırmak adına hem URL'den `ID` hem de Body'den `CompanyId` kontrolü yapılmaktadır.
3. **Soft Delete Politikası:** Kurumsal veri güvenliği için fiziksel silme (Hard Delete) yerine bayrakla işaretleme (Soft Delete) yapılmıştır.

---

## 🐞 4. Karşılaşılan Sorunlar ve Çözümler
* **CORS Hataları:** Frontend ve Backend farklı portlarda çalıştığı için oluşan erişim engeli, .NET tarafında `AddCors` politikası ile çözülmüştür.
* **DTO Uyuşmazlığı:** Backend'in beklediği sayısal (int) verilerin Frontend'den string gitmesi nedeniyle oluşan `400 Bad Request` hatası, `Number()` dönüşümü ile giderilmiştir.
* **Axios Definition:** `axios is not defined` hatası, modül importları ve global yapılandırma ile çözülmüştür.

---

## 🤖 5. Yapay Zeka (AI) Kullanımı
Proje geliştirme sürecinde **Gemini 3 Flash** şu aşamalarda yardımcı olmuştur:
* Karmaşık SQL test verilerinin üretilmesi.
* TypeScript tip hatalarının (`unknown`, `undefined`) çözümü.
* Dökümantasyon standartlarının oluşturulması.

---
*Hazırlayan: Emre Özermiş*
