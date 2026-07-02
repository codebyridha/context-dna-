function ChatWindow({
  messages,
  message,
  setMessage,
  sendMessage,
}) {

  return (

    <div className="chat-container">

      <div className="chat-header">
        💬 AI Assistant
      </div>

      <div className="chat-messages">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={
              msg.sender === "bot"
                ? "bot-message"
                : "user-message"
            }
          >

            {msg.text}

          </div>

        ))}

      </div>

      <div className="chat-input">

        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {

            if (e.key === "Enter") {

              sendMessage();

            }

          }}
        />

        <button
          onClick={sendMessage}
        >
          Send
        </button>

      </div>

    </div>

  );

}

export default ChatWindow;