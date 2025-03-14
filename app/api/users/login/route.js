import { loginUser } from "../../controllers/userControllers";

export async function POST(req) {
    return loginUser(req);
}
