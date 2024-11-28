import { useDispatch, useSelector, useStore } from "react-redux"
import { KanbasDispatch, KanbasStore, RootState } from "./Kanbas/store"

export const useKanbasDispatch = useDispatch.withTypes<KanbasDispatch>()
export const useKanbasSelector = useSelector.withTypes<RootState>()
export const useKanbasStore = useStore.withTypes<KanbasStore>()