import { IProfile, Logger, LoggingConfigurer, ImperativeError,
    CredentialManagerFactory } from "@zowe/imperative";
import { getDefaultProfile } from "@zowe/core-for-zowe-sdk";
import { Shell, SshSession } from "@zowe/zos-uss-for-zowe-sdk";

(async () => {
    //Initialize the Imperative Credential Manager Factory and Logger
    Logger.initLogger(LoggingConfigurer.configureLogger('lib', {name: 'test'}));
    // Uncommment the below line if the Secure Credential Store is in use
    // await CredentialManagerFactory.initialize({service: "Zowe-Plugin"});

    // Get the default z/OSMF profile and create a z/OSMF session with it
    let defaultSshProfile: IProfile;
    try {
        defaultSshProfile = await getDefaultProfile("ssh", true);
    } catch (err) {
        throw new ImperativeError({msg: "Failed to get a profile."});
    }

    const session: SshSession = SshSession.createBasicSshSession(defaultSshProfile);
    await Shell.executeSsh(session, "df .", (data: string) => {
        if (data.trim()) console.log(data);
    });
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
