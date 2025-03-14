import { registerUser } from "../../controllers/userControllers";

export async function POST(req) {
    return registerUser(req);
}
