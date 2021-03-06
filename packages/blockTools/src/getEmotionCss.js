/*
  Copyright 2020-2021 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import createEmotion from 'create-emotion';

let emotionCss = null;

const getEmotionCss = () => {
  try {
    if (!emotionCss) {
      const { css } = createEmotion({
        container: document.getElementById('emotion'),
      });
      emotionCss = css;
    }
    return emotionCss;
  } catch (error) {
    throw new Error('Emotion failed to initilize: ' + error.message);
  }
};

export default getEmotionCss;
