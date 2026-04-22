type State = {
  transactions: any[];
  skippedCount: number;
  status: "idle" | "parsing" | "success";
};

type Action =
  | { type: "START_PARSING" }
  | { type: "SET_DATA"; payload: { transactions: any[]; skipped: number } }
  | { type: "RESET" };

export function analyzerReducer(state: State, action: Action): State {
  switch (action.type) {
    case "START_PARSING":
      return { ...state, status: "parsing" };
    case "SET_DATA":
      return {
        status: "success",
        transactions: action.payload.transactions,
        skippedCount: action.payload.skipped,
      };
    case "RESET":
      return { transactions: [], skippedCount: 0, status: "idle" };
    default:
      return state;
  }
}
