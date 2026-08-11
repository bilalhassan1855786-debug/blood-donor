import connectDB from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      userId,
      answers,
    } = await req.json();

    if (!userId) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 }
      );
    }

    let passed = true;
    let rejectionReason = "";

    if (!answers.ageConfirm) {
      passed = false;
      rejectionReason =
        "Minimum age requirement not met";
    }

    else if (!answers.weightQuestion) {
      passed = false;
      rejectionReason =
        "Weight less than 50kg";
    }

    else if (answers.hepatitis) {
      passed = false;
      rejectionReason =
        "Hepatitis";
    }

    else if (answers.hiv) {
      passed = false;
      rejectionReason =
        "HIV/AIDS";
    }

    else if (answers.bloodDisease) {
      passed = false;
      rejectionReason =
        "Blood Disease";
    }

    else if (answers.seriousDisease) {
      passed = false;
      rejectionReason =
        "Serious Disease";
    }

    else if (answers.recentSurgery) {
      passed = false;
      rejectionReason =
        "Recent Surgery";
    }

    else if (answers.fever) {
      passed = false;
      rejectionReason =
        "Fever or Infection";
    }

    else if (answers.pregnancy) {
      passed = false;
      rejectionReason =
        "Pregnancy";
    }

    else if (answers.doctorRestriction) {
      passed = false;
      rejectionReason =
        "Doctor Restriction";
    }

    else if (answers.recentDonation) {
      passed = false;
      rejectionReason =
        "Recent Donation";
    }

    let nextEligibleDate = null;

    if (passed) {
      nextEligibleDate = new Date();
      nextEligibleDate.setMonth(
        nextEligibleDate.getMonth() + 3
      );
    }

    const user =
      await User.findByIdAndUpdate(
        userId,
        {
          healthCheck: {
            passed,
            checkedAt: new Date(),
            rejectionReason,
            nextEligibleDate,
            answers,
          },
        },
        { new: true }
      );

    return Response.json({
      success: true,
      passed,
      rejectionReason,
      nextEligibleDate,
      user,
    });

  } catch (error: any) {

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}