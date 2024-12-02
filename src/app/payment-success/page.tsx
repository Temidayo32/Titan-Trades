export default function PaymentSuccess() {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="text-center p-8 max-w-md w-full">
          <h1 className="text-4xl font-extrabold text-orange-500 mb-4">🎉 Payment Successful! 🎉</h1>
          <p className="text-lg text-white mb-6">Your payment was successfully processed. Thank you for your purchase!</p>
          <img
            src="https://media.giphy.com/media/3o6gE5aYHq9PyjZ9oc/giphy.gif"
            alt="Celebration"
            className="w-48 h-48 mx-auto mb-6"
          />
          <a
            href="/"
            className="inline-block py-3 px-6 bg-orange-500 text-white text-lg font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }
