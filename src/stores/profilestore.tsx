import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProfileState {
  nickie: string
  setNickie: (newName: string) => void
  birthday: string
  setBirthday: (newDate: string) => void
  uploadfile: string,
  setUploadfile: (newProfile: string) => void
}

const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      nickie: '',
      setNickie: (newName) => set({ nickie: newName }),
      birthday: '',
      setBirthday: (newDate) => set({ birthday: newDate }),
      uploadfile: '',
      setUploadfile: (newProfile) => set({uploadfile: newProfile})
    }),
      
    {
      name: 'profile-storage', 
    }
  )
)

export default useProfile
