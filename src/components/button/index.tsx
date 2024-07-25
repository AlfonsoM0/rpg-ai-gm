import { Copy } from './button-copy';
import STT from './button-stt';

export const Button = {
  Copy,
  /**
 * Use with
  ```
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState(');
  ...
  <Button.STT text={text} setText={setText} setIsListening={setIsListening} />
  ```
  * Default class
  ```
  className="btn btn-sm p-0"
  ```
  * Icons
  ```
  iconOn = <Icon.MicrophoneOn className="w-4 h-4 stroke-success" />,
  iconOff = <Icon.MicrophoneOff className="w-4 h-4 stroke-error" />,
  ```
 */
  STT,
};
