/*
 * Copyright 2021 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { wrapped } from "@kie-tools-core/i18n/dist/core";
import { de as de_common } from "@kie-tools/i18n-common-dictionary";
import { DmnFormI18n } from "..";

export const de: DmnFormI18n = {
  ...de_common,
  formToolbar: {
    disclaimer: {
      title: "Nur für die Entwicklung",
      description: `Diese Bereitstellung ist für die Verwendung während der ${"Entwicklung".bold()} vorgesehen, daher sollten die Benutzer die
        Dienste nicht in der Produktion oder für irgendeine Art von geschäftskritischen Arbeitslasten verwenden.`,
    },
  },
  page: {
    error: {
      title: `${de_common.terms.oops}!`,
      explanation: "Die Seite konnte aufgrund eines Fehlers nicht gerendert werden.",
      dmnNotSupported: `${de_common.names.dmn} hat ein Konstrukt, das nicht unterstützt wird. `,
      uploadFiles: "Vergessen Sie nicht, die aktuelle Datei und die verwendeten Eingaben hochzuladen",
      referToJira: ["Bitte lesen Sie ", wrapped("jira"), " und melden Sie ein Problem."],
    },
  },
  error: {
    title: "Ein unerwarteter Fehler ist aufgetreten, während versucht wurde, die Datei abzurufen",
    notFound: "Eine erforderliche Datei konnte nicht gefunden werden",
  },
};
