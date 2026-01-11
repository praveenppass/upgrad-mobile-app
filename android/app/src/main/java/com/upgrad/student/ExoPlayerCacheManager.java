package com.upgrad.student;

import android.content.Context;

import com.google.android.exoplayer2.database.StandaloneDatabaseProvider;
import com.google.android.exoplayer2.upstream.cache.NoOpCacheEvictor;
import com.google.android.exoplayer2.upstream.cache.SimpleCache;

import java.io.File;

public class ExoPlayerCacheManager {

    private static SimpleCache simpleCache;
    private static File cacheDir;

    public static synchronized SimpleCache getCache(Context context) {
        if (simpleCache == null) {
            cacheDir = new File(context.getCacheDir(), "media_cache");
            simpleCache = new SimpleCache(
                    cacheDir,
                    new NoOpCacheEvictor(),
                    new StandaloneDatabaseProvider(context)
            );
        }
        return simpleCache;
    }

    public static synchronized void releaseCache() {
        if (simpleCache != null) {
            try {
                simpleCache.release();
            } catch (Exception e) {
                e.printStackTrace();
            }
            simpleCache = null;
        }
    }

    /**
     * Clears the ExoPlayer cache completely.
     * This will remove all cached media so videos load fresh.
     */
    public static synchronized void clearCache(Context context) {
        // Release current cache instance
        releaseCache();

        // Delete cache folder
        try {
            if (cacheDir == null) {
                cacheDir = new File(context.getCacheDir(), "media_cache");
            }
            deleteDir(cacheDir);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Recursively deletes all files in the directory.
     */
    private static boolean deleteDir(File dir) {
        if (dir != null && dir.isDirectory()) {
            String[] children = dir.list();
            for (String child : children) {
                boolean success = deleteDir(new File(dir, child));
                if (!success) {
                    return false;
                }
            }
        }
        return dir != null && dir.delete();
    }
}
