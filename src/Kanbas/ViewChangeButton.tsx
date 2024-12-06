import { BiGlasses } from "react-icons/bi";
import { RoleView } from "./Account/RoleShownContent";
import { setCurrentView } from "./viewReducer";
import { useKanbasSelector, useKanbasDispatch } from "../hooks";

export default function ViewButton({ className } : { className?: string }) {
    const { currentUser } = useKanbasSelector(state => state.accountReducer);
    const { currentView } = useKanbasSelector(state => state.viewReducer);
    const dispatch = useKanbasDispatch();

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