import supabase, { supabaseUrl } from "./supabase";

export const signup = async ({ full_name, email, password }) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name,
                avatar: "",
            },
        },
    });

    if (error) throw new Error(error.message);
    return data;
};

export const login = async ({ email, password }) => {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);
    return data;
};

export const getCurrentUser = async () => {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);

    return data?.user;
};

export const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
};

export const updateCurrentUser = async ({
    password,
    fullName: full_name,
    avatar,
}) => {
    //update password or full name
    let updateData;
    if (password) updateData = { password };
    if (full_name) updateData = { data: { full_name } };

    const { data, error } = await supabase.auth.updateUser(updateData);

    if (error) throw new Error(error.message);

    if (!avatar) return data;

    //upload avatar image

    const fileName = `avatar-${data.user.id}-${Math.random()}`;

    const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    //update avatar in user
    const { data: updatedUser, errorAvatar } = await supabase.auth.updateUser({
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
        },
    });

    if (errorAvatar) throw new Error(errorAvatar.message);
    return updatedUser;
};
