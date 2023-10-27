const Poster = () => {
  return (
    <>
      <div className="border shadow-lg w-[440px] h-[450px] mx-auto px-2 poster">
        <div className="flex flex-col items-center ">
          <img
            src="/public/images/logoAudit.jpg"
            alt="Ghana_Audit_Service_logo"
            className="w-[100px]"
          />
          <div className="w-[100px] h-[15px] bg-green-800"></div>
        </div>

        <div className="mt-8">
          <h1 className="text-green-800 text-center text-3xl logo_heading">
            Vision
          </h1>
          <div className="flex flex-col items-center mb-2">
            <div className="w-[155px] h-[1px] bg-black"></div>
          </div>

          <p className="text-xs text-center">
            TO BE ONE OF THE LEADING SUPREME AUDIT INSTITUTIONS
          </p>
          <p className="text-xs text-center">
            IN THE WORLD, DELIVERING PROFESSIONAL, EXCELLENT,
          </p>
          <p className="text-xs text-center">
            {" "}
            AND COST EFFECTIVE AUDITING SERVICES
          </p>
        </div>

        <div className="mt-8 ">
          <h1 className="text-green-800 text-center text-3xl logo_heading">
            Mission
          </h1>
          <div className="flex flex-col items-center mb-2">
            <div className="w-[155px] h-[2px] bg-black"></div>
          </div>

          <p className="text-xs text-center">
            TO PROMOTE GOOD GOVERNANCE IN THE AREAS OF TRANSPARENCY,
          </p>
          <p className="text-xs text-center">
            ACCOUNTABILITY AND PROBITY IN THE PUBLIC FINANCIAL MANAGEMENT
          </p>
          <p className="text-xs text-center">
            {" "}
            SYSTEM OF GHANA BY AUDITING TO RECOGNIZE INTERNATIONAL AUDITING
          </p>
          <p className="text-xs text-center">
            STANDARDS, THE MANAGEMENT OF PUBLIC RESOURCES AND REPORTING TO
            PARLIAMENT
          </p>
        </div>
      </div>
    </>
  );
};

export default Poster;
