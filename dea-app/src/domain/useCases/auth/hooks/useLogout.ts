import { logout } from '@/domain/features/auth/auth';
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store/store";

export function useLogout() {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logout());
    };

    return handleLogout;
}
