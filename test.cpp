class Solution {
public:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        return buildTree(0,inorder.size()-1,0,postorder.size()-1,inorder,postorder);
    }
    TreeNode* buildTree(int ll,int lr,int rl,int rr,vector<int> inorder,vector<int> postorder){
        if(ll>lr||rl>rr) return NULL;
        int len=0;
        for(int i=ll;i<=lr;i++){
            if(inorder[i]==postorder[rr]) break;
            len++;
        }
        TreeNode* root=new TreeNode(postorder[rr]);
        root->left=buildTree(ll,ll+len-1,rl,rl+len-1,inorder,postorder);
        root->right=buildTree(ll+len+1,lr,rl+len,rr-1,inorder,postorder);
        return root;
    }
};