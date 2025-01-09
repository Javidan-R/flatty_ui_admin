// src/types/user/UserResponse.ts

export interface UserResponse {
    id: number; // Unikal istifadəçi ID-si
    name: string; // İstifadəçinin adı
    surname: string; // İstifadəçinin soyadı
    photo: string; // TOD
    phoneNumber: string; // İstifadəçinin telefon nömrəsi
    position: string; // İstifadəçinin vəzifəsi
    department: string; // İstifadəçinin şöbəsi
    status: string; // İstifadəçinin statusu (aktiv/passiv və s.)
    activity: string; // İstifadəçinin fəaliyyəti (onlayn/offline və s.)
}
