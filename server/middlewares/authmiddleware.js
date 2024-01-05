import jwt from "jsonwebtoken";

export const agentMiddleware = async (req, res, next) => {
  try {
    const cookieToken = req.cookies.lInfo;
    console.log("Cookie Token:", cookieToken);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - Missing token" });
    }

    const user = await jwt.verify(token, "8923r4u9832u423iu");

    if (!user.is_employee) {
      return res
        .status(403)
        .json({ error: "Forbidden - Agent access required" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in agentMiddleware:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const accountantMiddleware = async (req, res, next) => {
  try {
    const cookieToken = req.cookies.lInfo;
    console.log("Cookie Token:", cookieToken);
    if (!cookieToken) {
      return res.status(401).json({ error: "Unauthorized - Missing token" });
    }

    const user = await jwt.verify(cookieToken, "8923r4u9832u423iu");

    if (!user.is_Accountant) {
      return res
        .status(403)
        .json({ error: "Forbidden - Accountant access required" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in accountantMiddleware:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const SuperAdminMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.lInfo;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Missing Admin token" });
    }

    const user = await jwt.verify(token, "8923r4u9832u423iu");

    if (!user.is_superadmin) {
      return res
        .status(403)
        .json({ error: "Forbidden - Super admin access required" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in SuperAdminMiddleware:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const accessMiddlewareForAgentAccountantAdmin = async (
  req,
  res,
  next
) => {
  try {
    const cookieToken = req.cookies.lInfo;
    console.log("Cookie Token:", cookieToken);
    if (!cookieToken) {
      return res.status(401).json({ error: "Unauthorized - Missing token" });
    }

    const user = await jwt.verify(cookieToken, "8923r4u9832u423iu", {});

    if (!user.is_superadmin && !user.is_employee && !user.is_Accountant) {
      return res.status(403).json({
        error: "Forbidden - Admin, Agent, or Accountant access required",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in accessMiddlewareForAgentAccountantAdmin:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const accessMiddlewareForAgentAndSuperAdmin = async (req, res, next) => {
  try {
    const cookieToken = req.cookies.lInfo;
    console.log("Cookie Token:", cookieToken);

    if (!cookieToken) {
      return res.status(401).json({ error: "Unauthorized - Missing token" });
    }

    const user = await jwt.verify(cookieToken, "8923r4u9832u423iu");

    if (!user.is_superadmin && !user.is_employee) {
      return res
        .status(403)
        .json({ error: "Forbidden - Admin, Agent access required" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in accessMiddlewareForAgentAndSuperAdmin:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", errorMsg: error.message });
  }
};

export const accessMiddlewareForAccountantAndSuperAdmin = async (
  req,
  res,
  next
) => {
  try {
    const cookieToken = req.cookies.lInfo;

    if (!cookieToken) {
      return res.status(401).json({ error: "Unauthorized - Missing token" });
    }

    const user = await jwt.verify(token, "8923r4u9832u423iu");

    if (!user.is_superadmin && !user.is_Accountant) {
      return res.status(403).json({
        error: "Forbidden - Accountant or SuperAdmin access required",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(
      "Error in accessMiddlewareForAccountantAndSuperAdmin:",
      error
    );
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
