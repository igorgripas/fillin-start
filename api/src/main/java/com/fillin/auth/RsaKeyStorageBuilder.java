package com.fillin.auth;

import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.io.ClassPathResource;
import ua.ardas.jwt.KeyStorage;

import java.io.*;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;


public class RsaKeyStorageBuilder {

    private static final SignatureAlgorithm DEFAULT_SIGNATURE_ALGORITHM = SignatureAlgorithm.RS512;
    public static final String RSA_ALGORITHM_STRING = "RSA";

    private String signatureAlgorithmStr;
    private InputStream privateKeyInputStream;
    private InputStream publicKeyInputStream;


    public RsaKeyStorageBuilder signatureAlgorithm(String signatureAlgorithmStr) {
        this.signatureAlgorithmStr = signatureAlgorithmStr;
        return this;
    }

    public RsaKeyStorageBuilder privateKey(String privateKey) throws IOException {
        return privateKey.startsWith(File.separator) ? privateKeyPath(privateKey) :
                privateKeyName(privateKey);
    }

    public RsaKeyStorageBuilder publicKey(String publicKey) throws IOException {
        return publicKey.startsWith(File.separator) ? publicKeyPath(publicKey) :
                publicKeyName(publicKey);
    }

    public RsaKeyStorageBuilder privateKeyName(String privateKeyFileName) throws IOException {
        this.privateKeyInputStream = new ClassPathResource(privateKeyFileName).getInputStream();
        return this;
    }

    public RsaKeyStorageBuilder publicKeyName(String publicKeyFileName) throws IOException {
        this.publicKeyInputStream = new ClassPathResource(publicKeyFileName).getInputStream();
        return this;
    }

    public RsaKeyStorageBuilder privateKeyPath(String privateKeyPath) throws FileNotFoundException {
        this.privateKeyInputStream = new FileInputStream(new File(privateKeyPath));
        return this;
    }

    public RsaKeyStorageBuilder publicKeyPath(String publicKeyPath) throws FileNotFoundException {
        this.publicKeyInputStream = new FileInputStream(new File(publicKeyPath));
        return this;
    }


    public KeyStorage build() throws NoSuchAlgorithmException, IOException, InvalidKeySpecException {
        if (null == privateKeyInputStream && null == publicKeyInputStream) {
            throw new IllegalArgumentException("Either 'privateKeyPath' or 'publicKeyPath' must be set");
        }

        SignatureAlgorithm signatureAlgorithm = StringUtils.isEmpty(signatureAlgorithmStr)
                ? DEFAULT_SIGNATURE_ALGORITHM : SignatureAlgorithm.forName(this.signatureAlgorithmStr);


        Key privateKey = null == privateKeyInputStream ? null : getRsaPrivateKey(privateKeyInputStream);
        Key publicKey = null == publicKeyInputStream ? null : getRsaPublicKey(publicKeyInputStream);

        return new KeyStorage(privateKey, publicKey, signatureAlgorithm);
    }


    private PrivateKey getRsaPrivateKey(InputStream inputStream) throws IOException, NoSuchAlgorithmException, InvalidKeySpecException {
        byte[] keyBytes = IOUtils.toByteArray(inputStream);

        PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);
        return KeyFactory.getInstance(RSA_ALGORITHM_STRING).generatePrivate(spec);
    }


    private PublicKey getRsaPublicKey(InputStream inputStream) throws IOException, NoSuchAlgorithmException, InvalidKeySpecException {
        byte[] keyBytes = IOUtils.toByteArray(inputStream);

        X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);
        return KeyFactory.getInstance(RSA_ALGORITHM_STRING).generatePublic(spec);
    }
}

