import { IProfile, Session, Logger, LoggingConfigurer, ImperativeError,
    CredentialManagerFactory } from "@zowe/imperative";
import { ZosmfSession } from "@zowe/zosmf-for-zowe-sdk";
import { getDefaultProfile } from "@zowe/core-for-zowe-sdk";
import { List, IListOptions, IZosFilesResponse } from "@zowe/zos-files-for-zowe-sdk";

(async () => {
    //Initialize the Imperative Credential Manager Factory and Logger
    Logger.initLogger(LoggingConfigurer.configureLogger('lib', {name: 'test'}));
    // Uncommment the below line if the Secure Credential Store is in use
    // await CredentialManagerFactory.initialize({service: "Zowe-Plugin"});

    // Get the default z/OSMF profile and create a z/OSMF session with it
    let defaultZosmfProfile: IProfile;
    try {
        defaultZosmfProfile = await getDefaultProfile("zosmf", true);
    } catch (err) {
        throw new ImperativeError({msg: "Failed to get a profile."});
    }

    // List Options
    const dataset: string = `${defaultZosmfProfile.user}.PUBLIC.*`;
    const options: IListOptions = {};
    const session: Session = ZosmfSession.createBasicZosmfSession(defaultZosmfProfile);
    let response: IZosFilesResponse;
    response = await List.dataSet(session, dataset, options);
    const objArray = response.apiResponse.items;
    for (const obj of objArray) {
        if (obj) {
            console.log(obj.dsname.toString());
        }
    };
    process.exit(0);
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
