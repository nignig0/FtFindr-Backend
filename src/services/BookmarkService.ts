import { supabase } from "../supabase";
import { Bookmark } from "../types";

const table = 'bookmarks';

const addBookmark = async (bookmarkObj: Partial<Bookmark>)=>{
    const {error} = await supabase.from(table).insert([bookmarkObj]);
    if(error) throw Error(error.message);
}

const deleteBookmark = async (bId: string)=>{
    const { error } = await supabase.from(table).delete().eq('bid', bId);
    if (error) throw Error(error.message);
}

const getBookmarksByUser = async (userId: string)=>{
    const {data, error} = await supabase.from(table).select('*').eq('uid', userId).order('savedat');
    if(error) throw Error(error.message);
    return data;
}

export const BookmarkServices = {
    addBookmark, 
    deleteBookmark, 
    getBookmarksByUser
}
