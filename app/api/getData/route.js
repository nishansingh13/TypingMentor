import { createUser } from "../controllers/userControllers";

export async function POST(req) {
    return createUser(req); // Call the function directly
}
