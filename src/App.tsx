import { useEffect, useState } from "react";
import "./App.css";
import {
  user as userClient,
  org as orgClient,
  embed,
  TruffleUser,
  TruffleOrg,
} from "@trufflehq/sdk";

import { fromSpecObservable } from "./helpers";
import { Question, QuizBar } from "./components/QuizBar";

import { observer } from "@legendapp/state/react";
import { SocketProvider, useSocket } from "./SocketContext";

const user = fromSpecObservable<TruffleUser>(userClient.observable);
const org = fromSpecObservable<TruffleOrg>(orgClient.observable);

function App() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>(
    undefined
  );

  useEffect(() => {
    console.log("duplicate?");
    embed.setSize("600px", "225px");
    embed.setPosition("calc(50% - 300px)", "calc(100vh - 300px)");
  }, []);

  const socket = useSocket();

  useEffect(() => {
    console.log(socket);
    if (!socket) return;

    socket.on(
      "question",
      (text: string, answers: [string, string, string, string]) => {
        setCurrentQuestion({ text, answers });
        console.debug(`question received ${text} ${JSON.stringify(answers)}`);
      }
    );
  }, [socket]);

  return (
    <SocketProvider orgUserId="noId" orgId="orgId">
      <div className="App">
        {!!currentQuestion && (
          <QuizBar
            text={currentQuestion.text}
            answers={currentQuestion.answers}
          />
        )}
      </div>
    </SocketProvider>
  );
}

export default observer(App);
