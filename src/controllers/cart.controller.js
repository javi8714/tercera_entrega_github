export class cartService {
    static createCart =  async (req, res) => {
        try {
            const cartCreated = await cartService.save();
            res.json({ status: "success", data: cartCreated });
        } catch (error) {
            res.json({ status: "error", message: error.message });
        }
    };

}