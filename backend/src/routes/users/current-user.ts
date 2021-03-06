import express from "express";
const router = express.Router();
import { User, Wallet } from "./../../models";
import { requireAuth } from "../../middlewares/require-auth";
import { currencyConverter, localConvert } from "../../utils";

router.get("/api/users/currentuser", requireAuth, async (req, res) => {
  const user = await User.findById(req.user?.id);

  const wallet = await Wallet.findOne({
    user: user?.id,
    wallet_type: "user",
  }).select("-user");

  const { amount } = await currencyConverter({
    from_currency: "USD",
    to_currency: "KES",
    amount: 1,
  });

  res.status(200).json({
    status: "sucess",
    user: {
      ...user?.toObject(),
      ...wallet?.toObject(),
      amount_in_bob: wallet?.amount_balance!.toFixed(2),
    },
  });
});

export { router as currentUserRouter };
