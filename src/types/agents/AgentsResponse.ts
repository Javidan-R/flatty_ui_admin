// src/types/user/UserResponse.ts

export interface AgentsResponse {
  id: number; // Unikal istifadəçi ID-si
  photo: string; // TOD
  name: string; // İstifadəçinin adı
  surname: string; // İstifadəçinin soyadı
  status: string; // İstifadəçinin statusu (aktiv/passiv və s.)
  phoneNumber: string; // İstifadəçinin telefon nömrəsi
  activePosts: number; // İstifadəçinin vəzifəsi
  company: string; // İstifadəçinin şöbəsi
}
