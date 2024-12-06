import { BiGlasses } from "react-icons/bi";
import { RoleView } from "./Account/RoleShownContent";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { setCurrentView } from "./viewReducer";

export default function ViewButton({ className } : { className?: string }) {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { currentView } = useSelector((state: RootState) => state.viewReducer);
    const dispatch = useDispatch();

    const nextView = () => currentUser?.role === currentView ? "STUDENT" : currentUser?.role;

    const toggleStudentView = () => {
        const next = nextView()
        if (next) {
        dispatch(setCurrentView(next))
        }
    }

    return <div>
          <RoleView role="FACULTY" loose>
            <button className={`btn btn-secondary ${className}`} onClick={toggleStudentView}>
              <BiGlasses className="fs-4 me-1"/>
              {`${nextView()?.charAt(0).toUpperCase()}${nextView()?.toLowerCase().slice(1)} View`}
            </button>
          </RoleView>
    </div>
}