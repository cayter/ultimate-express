/*
Copyright 2024 dimden.dev

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

import fs from "node:fs";
import { parentPort } from "node:worker_threads";

parentPort.on('message', (message) => {
    if(message.type === 'readFile') {
        try {
            const data = fs.readFileSync(message.path);
            const ab = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
            parentPort.postMessage({ key: message.key, data: ab }, [ab]);
        } catch(err) {
            parentPort.postMessage({ key: message.key, err: String(err) });
        }
    }
});
