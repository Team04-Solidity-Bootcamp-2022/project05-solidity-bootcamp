const Connect = ({ clickHandler }: any) => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
      <section aria-labelledby="details-heading">
        <div className="flex flex-col items-center text-center">
          <h2
            id="details-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Lottery
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-gray-600">
            Enter for a chance to win big
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-y-16 lg:px-16">
          <div>
            <div className="col-start-2 col-span-4 w-full overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1636587224433-3cd253788c40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
                alt="Lottery"
                className="h-1/2 w-1/2 mx-auto object-cover object-center"
              />
            </div>
            <p className="text-base text-gray-500 my-5 justify-center text-center">
              <a
                className="uppercase inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-slate-900 text-white hover:bg-slate-700"
                onClick={clickHandler}
              >
                <span>
                  Connect Metamask Wallet to Start{' '}
                  <span aria-hidden="true" className="text-slate-400 sm:inline">
                    →
                  </span>
                </span>
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Connect;
