import { IProfile, Session, Logger, LoggingConfigurer, ImperativeError,
    CredentialManagerFactory } from "@zowe/imperative";
import { ZosmfSession } from "@zowe/zosmf-for-zowe-sdk";
import { getDefaultProfile } from "@zowe/core-for-zowe-sdk";
import { IssueTso } from "@zowe/zos-tso-for-zowe-sdk";

(async () => {
    //Initialize the Imperative Credential Manager Factory and Logger
    Logger.initLogger(LoggingConfigurer.configureLogger('lib', {name: 'test'}));
    // Uncommment the below line if the Secure Credential Store is in use
    // await CredentialManagerFactory.initialize({service: "Zowe-Plugin"});

    // Get the default z/OSMF profile and create a z/OSMF session with it
    let defaultZosmfProfile: IProfile;
    let defaultTsoProfile: IProfile;
    try {
        defaultZosmfProfile = await getDefaultProfile("zosmf", true);
        defaultTsoProfile = await getDefaultProfile("tso", false);
    } catch (err) {
        throw new ImperativeError({msg: "Failed to get a profile."});
    }

    const session: Session = ZosmfSession.createBasicZosmfSession(defaultZosmfProfile);
    const accountNumber = defaultTsoProfile.account;
    const command = "status";
    const response = await IssueTso.issueTsoCommand(session, accountNumber, command);
    if (response.success) {
        console.log(response);
    } else {
        throw new Error(`Failed to issue TSO command "${command}"`);
    }
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
